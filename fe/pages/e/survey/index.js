import { useState, memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axiosInstance from "../../../utils/axiosInstance";

const QuestionWithChoices = memo(function QuestionWithChoices(props) {

    const { no, state, setState, register, onClickHandleChecks, name } = props

    return (
        <div className="mt-5">
            {no}. {state.question}
            {state.choices.map((q, i) => (
                <div key={i} 
                    className="flex items-center gap-3 px-3">
                    <input
                        onClick={() => onClickHandleChecks(i, setState)}
                        value={q.value}
                        checked={q.checked || ''}
                        {...register(name)}
                        type="checkbox"
                    />
                    <div>{q.text}</div>
                </div>
            ))}
        </div>
    )
})

const CustomerSurveySchema = yup.object().shape({
	q1:  yup.array().min(1, "This field is required."),
	q2:  yup.array().min(1, "This field is required."),
	q3:  yup.array().min(1, "This field is required."),
	q4: yup.number().typeError('This field is required and must be a number')
                .min(0, "Must be greater than 0")
                .max(5, "Must be less than or equal to 5"),
});

export default function CustomerSurvey() {
	const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            q1: [],
            q2: [],
            q3: [],
            q5: '',
            q6: ''
        },
		mode: 'onSubmit',
		resolver: yupResolver(CustomerSurveySchema)
	})

    const [q1, setQ1] = useState({
        question: 'Overall, how would you rate the quality of your customer service experience',
        choices: [
            { value: 'VERYPOSITIVE', text: 'Very Positive', checked: false },
            { value: 'SOMEWHATPOSITIVE', text: 'Somewhat Positive', checked: false },
            { value: 'NEUTRAL', text: 'Negative', checked: false },
            { value: 'SOMEWHATNEGATIVE', text: 'Somewhat Negative', checked: false },
            { value: 'VERYNEGATIVE', text: 'Very Negative', checked: false },
        ]
    })
    const [q2, setQ2] = useState({
        question: 'How well we understand and address your questions and concerns?',
        choices: [
            { value: 'EXTREMELYWELL', text: 'Extremely Well', checked: false },
            { value: 'VERYWELL', text: 'Very well', checked: false },
            { value: 'SOMEWHATWELL', text: 'Somewhat Well', checked: false },
            { value: 'NOTSOWELL', text: 'Not So Well', checked: false },
            { value: 'NOTATALLWELL', text: 'Not at all well', checked: false },
        ]
    })
    const [q3, setQ3] = useState({
        question: 'How much time did it take us to address your questions and concerns?',
        choices: [
            { value: 'MUCHSHORTERTHANEXPECTED', text: 'Much shorter than expected', checked: false },
            { value: 'ABOUTWHATIEXPECT', text: 'About what I expected', checked: false },
            { value: 'SHORTERTHANEXPECTED', text: 'Shorter than expected', checked: false },
            { value: 'LONGERTHANIEXPECTED', text: 'Longer than I expected', checked: false },
            { value: 'MUCHLONGERTHANIEXPECTED', text: 'Much longer than I expected', checked: false },
        ]
    })
    const q = {
        q4: {
            main: 'How likely is it that you would recommend our company/product/services to a friend or colleagues?',
            sub: 'Rate us between 1 to 5, wherein 5 is the Highest and 1 is the Lowest:'
        },
        q5: 'Do you have any other comments, question or concerns',
        q6: 'Do you know the name of the person who assisted you',
    }

    function onSubmit(data) {
        data = {
            ...data,
            q1: data['q1'][0],
            q2: data['q2'][0],
            q3: data['q3'][0],
        }
        axiosInstance.post('employee/customer-rating/', data)
        .then((_e) => {
            console.log('success');
        }).catch((_e) => {
            console.log('err')
        })
    }

    const onClickHandleChecks = useCallback((index, setState) => {
        setState(prevState => ({
            question: prevState.question,
            choices: prevState.choices.map((q, i) => 
                i === index ? {...q, checked: true} : {...q, checked: false}
            )
        }))
    }, [])

    return(
        <div className="bg-gray-200 min-h-screen">
            <div className="max-w-[900px] m-auto pt-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                Customer FeedbackForm
                            </div>
                            <div className="text-[14px]">
                                At First Philippines Scales, we makesure customers come first. Let us know how we are
                                doing and how we can serve you better. Please rate us on the degree of which
                                you agree or disagree based on your experience with them.
                            </div>
                            <QuestionWithChoices
                                no="1"
                                state={q1}
                                setState={setQ1}
                                register={register}
                                name="q1"
                                onClickHandleChecks={onClickHandleChecks}
                            />
                            <div className="text-red-500">{errors?.q1 && errors?.q1?.message}</div>
                            <QuestionWithChoices
                                no="2"
                                state={q2}
                                setState={setQ2}
                                register={register}
                                name="q2"
                                onClickHandleChecks={onClickHandleChecks}
                            />
                            <div className="text-red-500">{errors?.q2 && errors?.q2?.message}</div>
                            <QuestionWithChoices
                                no="3"
                                state={q3}
                                setState={setQ3}
                                register={register}
                                name="q3"
                                onClickHandleChecks={onClickHandleChecks}
                            />
                            <div className="text-red-500">{errors?.q3 && errors?.q3?.message}</div>
                            <div className="mt-5">
                                <div>4. {q.q4.main}</div>
                                <div className="flex gap-2 items-center">
                                    <div className="ml-4">{q.q4.sub}</div>
                                    <input type="text" 
                                        {...register('q4')} 
                                        className="input max-w-[100px]" />
                                </div>
                            </div>
                            <div className="text-red-500">{errors?.q4 && errors?.q4?.message}</div>
                            <div className="mt-5">
                                <div>5. {q.q5} (Optional)</div>
                                <textarea 
                                    name="" 
                                    id="" 
                                    {...register('q5')} 
                                    className="text-area" 
                                    rows="2"
                                ></textarea>
                            </div>
                            <div className="mt-5">
                                <div>6. {q.q6} (Optional)</div>
                                <input 
                                    type="text" 
                                    {...register('q6')}
                                    className="input" />
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
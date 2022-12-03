import { useSignatureStore } from "../../../store/signature";
import { useEffect, useState } from "react";
import Signature from "../../../components/signature";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axiosInstance from "../../../utils/axiosInstance";

const AttendanceSchema = yup.object().shape({
	customerName: yup.string().required('This field is required')
		.max(100, "Only 100 characters is allowed."),
	location: yup.string().required('This field is required')
		.max(255, "Only 255 characters is allowed."),
});

export default function Employee() {
	const signatureStore = useSignatureStore();
	const [isAddingSignature, setIsAddingSignature] = useState(false);
	const [isImageEmpty, setIsImageEmpty] = useState(false);
	const [status, setStatus] = useState({
		error: false,
		loading: false,
		success: false,
		infoMessage: '',
	})

	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(AttendanceSchema)
	})

	useEffect(() => {
		if(signatureStore.image){
			setIsImageEmpty(false);
		}
	}, [signatureStore.image])

	const onSubmit = ({ customerName, location }) => {
		setStatus({ 
			error: false, 
			success: false, 
			loading:true, 
			infoMessage: 'Saving attendance.' 
		})
		if(!signatureStore.image){
			setIsImageEmpty(true);
		}else{
			axiosInstance.post('employee/attendance/', {
				customer_name: customerName,
				location,
				signature: signatureStore.image,
			}).then((_e) => {
				setStatus({ 
					error: false, 
					success: true, 
					loading: false, 
					infoMessage: 'Attendance Saved.' 
				})
			}).catch((_e) => {
				setStatus({ 
					error: true, 
					success: false, 
					loading: false, 
					infoMessage: 'Something went wrong.' 
				})
			})
		}
	}


	return (
		<div>
			{isAddingSignature ? (
				<Signature setIsAddingSignature={setIsAddingSignature}/>
			): (
				<form 
					onSubmit={handleSubmit(onSubmit)}
					className="max-w-lg w-[90%] py-5 m-auto">
					{status.error || status.success && (
						<div className={`
								${status.error ? 'text-red-500': ''} 
								${status.success ? 'text-green-500': ''}`
						}>
							{status.infoMessage}
						</div>
					)}

					<label className="block text-md font-medium text-gray-700">Customer Name</label>
					<input type="text" 
							autoComplete="off"
							{...register('customerName')}
							className="input"
					/>
					<div className="text-red-500">{errors?.customerName && errors?.customerName?.message}</div>

					<div className="border border-indigo-600 p-4 rounded-lg max-w-[600px] mt-10">
						{signatureStore.image ? (
							<img src={signatureStore.image} 
								height={signatureStore.h} 
								width={signatureStore.w} />
						): 'No signature yet'}
					</div>
					<div className="text-red-500">{isImageEmpty && 'Signature is required.'}</div>
					<div className="mt-5">
						<button 
								type="button"
								className="btn btn-primary" 
								onClick={() => setIsAddingSignature(true)}> 
							{signatureStore.image ? 'Update Signature' : 'Add Signature'}
						</button>
					</div>


					<label className="block text-md font-medium text-gray-700 mt-10">Location</label>
					<input type="text" 
							autoComplete="off"
							{...register('location')}
							className="input"
					/>
					<div className="text-red-500">{errors?.location && errors?.location?.message}</div>

					<button 
						type="submit"
						className="btn btn-primary mt-5 float-right">Save</button>
				</form>
			)}
		</div>
	)
}
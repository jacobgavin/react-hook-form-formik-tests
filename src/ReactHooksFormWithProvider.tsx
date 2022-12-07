import {Box, Button, TextField} from "@mui/material"
import {FormProvider, useForm, useFormContext} from "react-hook-form"
import arrayOfLength from "./arrayOfLength";
import { useRef } from "react";

type FormValues = Record<string, string>

let renderCount = 0;

export default function ReactHooksFormWithProvider() {
	const methods = useForm<FormValues>()
	
	function onSubmit(data: FormValues) {
		alert(JSON.stringify(data))
	}
	
	++renderCount
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
					<span>Render count: {renderCount}</span>
				</Box>
					<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap'}}>
						{arrayOfLength(10).map(index => (
							<MyInput index={index} key={index} />
							))}
					</Box>
					<Button type={'submit'}>Submit</Button>
			</form>
		</FormProvider>
	)
}

type MyInputProps = {
	index: number;
}
function MyInput({index}: MyInputProps) {
	const { register, formState: { errors } } = useFormContext();
	const ref = useRef(0);
	ref.current = ref.current + 1
	console.log(errors[`firstName_${index}`])
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
			<span>Render count input: {ref.current}</span>
			<TextField inputProps={{ ...register(`firstName_${index}`, { maxLength: { value: 4, message: 'Too long'} } ) }} label={`Firstname ${index}`} />
			{errors[`firstName_${index}`] && <p role="alert">{errors[`firstName_${index}`]?.message?.toString()}</p>}
		</Box>
	)
}

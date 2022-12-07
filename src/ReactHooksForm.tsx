import {Box, Button, TextField} from "@mui/material"
import {useForm, UseFormRegister} from "react-hook-form"
import arrayOfLength from "./arrayOfLength";
import { useRef } from "react";

type FormValues = Record<string, string>

let renderCount = 0;

export default function ReactHooksForm() {
	const {register, handleSubmit } = useForm<FormValues>()
	
	function onSubmit(data: FormValues) {
		alert(JSON.stringify(data))
	}
	
	++renderCount
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
				<span>Render count: {renderCount}</span>
			</Box>
				<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap'}}>
					{arrayOfLength(200).map(index => (
						<MyInput register={register} index={index} key={index} />
						))}
				</Box>
				<Button type={'submit'}>Submit</Button>
		</form>
	)
}

type MyInputProps = {
	index: number;
	register: UseFormRegister<FormValues>
}
function MyInput({register, index}: MyInputProps) {
	const ref = useRef(0);
	ref.current = ref.current + 1
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
			<span>Render count for all inputs: {ref.current}</span>
			<TextField {...register(`firstName_${index}`)} label={`Firstname ${index}`} />
		</Box>
	)
}

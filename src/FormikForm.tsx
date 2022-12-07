import {Box, Button, TextField} from "@mui/material"
import {useRef,useState} from "react";
import { Formik, Field, Form, useField } from 'formik';
import arrayOfLength from "./arrayOfLength";

export default function ReactHooksForm() {
	return (
		<Formik
		initialValues={{}}
		onSubmit={(values) => {
			alert(JSON.stringify(values))
		}}
		>
			<ActualForm />
		</Formik>
	)
}

type MyInputProps = {
	name: string;
	index: number;
}
function InputWithUseField({name,index}: MyInputProps) {
	const [field] = useField(name);
	const ref = useRef(0);
	ref.current = ref.current + 1
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
			<span>Render count: {ref.current}</span>
			<TextField  inputProps={{...field}} label={`Firstname ${index}`} />
		</Box>
	)
}
function InputWithField({name}: MyInputProps) {
	const ref = useRef(0);
	ref.current = ref.current + 1
	return (
		<Field
			name={name}
		>
			{(props) => (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
					<span>Render count: {ref.current}</span>
					<TextField InputProps={{...props.field}} />
				</Box>
			)}
		</Field>
	)
}


let renderCount = 0;
function ActualForm() {
	const [count, setCount] = useState(200)
	++renderCount
	return (
		<Form>
			{renderCount}
			<Box my={8}>
				<TextField label={'Set number of fields'} value={count} onChange={(event) => setCount(parseInt(event.target.value))} type={'number'} />
			</Box>
			<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap'}}>
				{arrayOfLength(count).map(index => (
					<InputWithUseField
						key={index}
						name={`firstName_${index}`}
						index={index}
					/>
				))}
			</Box>
			<Button type={'submit'}>Submit</Button>
		</Form>
	)
}

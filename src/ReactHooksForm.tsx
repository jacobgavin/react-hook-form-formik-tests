import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField} from "@mui/material"
import {useFieldArray, useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {isObject} from "formik";
import {useEffect,useMemo,useState} from "react";
import Chance from 'chance';

type FormValues = {
	members: Pointer & { checked: boolean }[]
	firstName: string;
}

let renderCount = 0;
export default function ReactHooksForm() {
	const pointer = yup.object().shape({
		pointerId: yup.string(),
		checked: yup.boolean()
	})
	const schema = yup.object().shape({
		firstName: yup.string().required('Required firstname').min(4, 'Needs to be 4 characters'),
		members: yup.array().of(pointer)
	})

	const [page, setPage] = useState(0)

	const mockMembers = useMockData(page)
	console.log({mockMembers})

	const {register, handleSubmit, formState: { errors }, control, reset } = useForm<FormValues>({
		resolver: yupResolver(schema),
	})
	const { fields } = useFieldArray({
		control,
		name: 'members'
	})

	useEffect(() => {
		console.log('length ', mockMembers.length)
		reset({
			members: mockMembers.map(member => ({ ...member, checked: false }))
		})

	}, [mockMembers])



	function onSubmit(data) {
		console.log(data)
	}
	console.log(errors)

	++renderCount
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
				{renderCount}
				<TextField {...register('firstName')} label={'Firstname'} error={isObject(errors.firstName)} helperText={errors.firstName?.message?.toString()} />
				<FormGroup>
					<FormControl>
						{fields.map(({ id}, index) => {
							console.log({ id })
							return (
							<FormControlLabel
								key={id}
								control={
								<Checkbox
									{...register(`members.${index + page * 10}.checked`)}
								/>
								}
								label={`Member ${index}`}
							/>
						)
							})}
					</FormControl>
				</FormGroup>
				<Button onClick={() => setPage(page => --page)}>Prev page</Button>
				<Button onClick={() => setPage(page => ++page)}>Next page</Button>
				<Button type={'submit'}>Submit</Button>
		</form>
	)
}
function arrayOfLength(size:number): number[] {
	return Array.from({ length: size }).map((_, index) => index);
}

function useMockData(page: number) {
	const [data, setData] = useState<Pointer[]>([])

	useEffect(() => {
		fetchFake(page).then((response) => {
			setData(response)
		})
	}, [page])

	return data;
}
const chance = new Chance()
type Pointer = { pointerId: string }
const fakeData = arrayOfLength(100).map(index => ({ pointerId: chance.guid() }))

async function fetchFake(page: number): Promise<Pointer[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(fakeData.slice(page * 10, page * 10 + 10))
		}, 1000)
	})
}

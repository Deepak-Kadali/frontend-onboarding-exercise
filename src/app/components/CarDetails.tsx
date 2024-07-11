import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { styled,Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import DataContext from '../DataContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

type CarDetailsType = {
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  color: string;
};

const FormControl = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
});

const FormContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const InputControl = styled('input')({
  width: '300px',
  padding: '15px',
  borderRadius: '5px',
  borderStyle: 'solid',
  // border:"1px",
});
const ErrorMessage = styled('p')({
  color: 'red',
});

const CarsDetails = () => {
  const { id } = useParams();
  const value = useContext(DataContext);
  const navigate = useNavigate();
  const idx = Number(id?.slice(1));
  // console.log(value, idx);
  const defaultValues = value?.CarsState[idx];
  // console.log(defaultValues);
  const schema = yup
    .object({
      name: yup
        .string()
        .required('This field is required')
        .max(100, 'Maximum 100 characters allowed')
        .test('is-unique', 'Name must be unique', function (carName: string) {
          const res = value?.CarsState.find((ele)=>ele.name === carName && ele.id !== idx)
          // console.log(value?.CarsState,res)
          return res ? false:true;
        }),
      model: yup
        .string()
        .required('This field is required')
        .max(100, 'Maximum 100 characters allowed'),
      yearOfRelease: yup
        .number()
        .typeError('Please enter a valid number')
        .min(2000, 'Number must be greater than 2000')
        .required('This field is required'),
      brand: yup
        .string()
        .required('This field is required')
        .max(100, 'Maximum 100 characters allowed'),
      color: yup
        .string()
        .required('This field is required')
        .max(100, 'Maximum 100 characters allowed'),
    })
    .required();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const onSubmit = (data: any) => {
    value?.setCarsState((prev) => {
      const updatedCars = [...prev];
      updatedCars[idx] = {
        id: idx,
        name: data.name,
        model: data.model,
        yearOfRelease: data.yearOfRelease,
        brand: data.brand,
        color: data.color,
      };
      return updatedCars;
    });
    navigate(`/Cars`);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <label>Name</label>
          <InputControl type="text" {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </FormControl>
        <FormControl>
          <label>Model</label>
          <InputControl type="text" {...register('model')} />
          <ErrorMessage>{errors.model?.message}</ErrorMessage>
        </FormControl>
        <FormControl>
          <label>Year of Release</label>
          <InputControl type="text" {...register('yearOfRelease')} />
          <ErrorMessage>{errors.yearOfRelease?.message}</ErrorMessage>
        </FormControl>
        <FormControl>
          <label>Brand</label>
          <InputControl type="text" {...register('brand')} />
          <ErrorMessage>{errors.brand?.message}</ErrorMessage>
        </FormControl>
        <FormControl>
          <label>Color</label>
          <InputControl type="text" {...register('color')} />
          <ErrorMessage>{errors.color?.message}</ErrorMessage>
        </FormControl>
        <Button variant="contained" type="submit" style={{margin:"10px"}}>Submit</Button>
      </form>
    </FormContainer>
  );
};

export default CarsDetails;

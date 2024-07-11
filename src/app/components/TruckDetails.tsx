import React, { useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { styled, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import DataContext from '../DataContext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Truck } from '../types/types';

const FormControl = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '300px',
});

const FormContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const PermitContainer = styled('div')({
  display: 'flex',
  margin:"10px",
});
const InputControl = styled('input')({
  width: '300px',
  padding: '15px',
  borderRadius: '5px',
  borderStyle: 'solid',
  margin:"10px",
});
const PermitControl = styled('input')({
  width: '150px',
  padding: '5px',
  borderRadius: '5px',
  borderStyle: 'solid',
});
const ErrorMessage = styled('p')({
  color: 'red',
});


const TruckDetails = () => {
  const { id } = useParams();
  const value = useContext(DataContext);
  const navigate = useNavigate();
  const idx = Number(id?.slice(1));
  const schema = yup
    .object({
      name: yup
        .string()
        .required('This field is required')
        .max(100, 'Maximum 100 characters allowed')
        .test('is-unique', 'Name must be unique', function (TruckName: string) {
          const res = value?.TrucksState.find(
            (ele) => ele.name === TruckName && ele.id !== idx
          );
          return res ? false : true;
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
      permits: yup.array().of(
        yup.object().shape({
          permit_no: yup
            .string()
            .required('permit number is required')
            .length(15, 'Permit number must be exact 15 characters'),
          state: yup.string().required('State is required'),
        })
      ),
    })
    .required();
  const defaultValues = value?.TrucksState[idx] || {
    id: idx,
    name: '',
    model: '',
    yearOfRelease: 2000,
    brand: '',
    permits: [
      {
        permit_no: '',
        state: '',
      },
    ],
  };
  const { register, handleSubmit, formState, control } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors, isDirty } = formState;
  const { fields, append, remove } = useFieldArray({
    name: 'permits',
    control,
  });
  // console.log(errors.permits);
  const onSubmit = (data: any) => {
    console.log(data)
    value?.setTrucksState((prev) => {
      const updatedTrucks = [...prev];
      updatedTrucks[idx] = {
        id: idx,
        name: data.name,
        model: data.model,
        yearOfRelease: data.yearOfRelease,
        brand: data.brand,
        permits: data.permits,
      };
      return updatedTrucks;
    });
    navigate(`/Trucks`);
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

        <div>
          <label>Permits</label>
          <div>
            {fields.map((feild, idx) => {
              return (
                <PermitContainer key={feild.id}>
                  <FormControl>
                    <PermitControl
                      type="text"
                      {...register(`permits.${idx}.permit_no`)}
                    />
                    {errors.permits &&
                      errors.permits[idx] &&
                      errors.permits[idx]?.permit_no && (
                        <ErrorMessage>
                          {errors.permits[idx]?.permit_no?.message}
                        </ErrorMessage>
                      )}
                  </FormControl>
                  <FormControl>
                    <PermitControl
                      type="text"
                      {...register(`permits.${idx}.state`)}
                    />
                    {errors.permits &&
                      errors.permits[idx] &&
                      errors.permits[idx]?.state && (
                        <ErrorMessage>
                          {errors.permits[idx]?.state?.message}
                        </ErrorMessage>
                      )}
                  </FormControl>

                  <Button variant="contained" onClick={() => remove(idx)}>
                    Remove Permit
                  </Button>
                </PermitContainer>
              );
            })}
            <Button
              variant="contained"
              onClick={() =>
                append({
                  permit_no: '',
                  state: '',
                })
              }
            >
              Add Permit
            </Button>
          </div>
        </div>
        <Button variant="contained" type="submit" style={{margin:"10px"}}>Submit</Button>
      </form>
    </FormContainer>
  );
};

export default TruckDetails;

import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

const categoryPoints = {
  value0: 0, value1: 1,
};

function determineRisklevel(score) {
  switch (true) {
    case score >= 2 && score === 3:
      return `Medium`;
    case score >= 4 && score === 5:
      return `High`;
    default:
      return `Low`;
  }
}

export const NewAssessment = () => {
  const [ points, setPoints ] = useState(0);
  const { formState: { errors }, handleSubmit, register, watch } = useForm();
  const onSubmit = async (data) => {

    const { category1, category2, category3, category4, category5 } = data;
    const sum = parseInt(category1) +
    parseInt(category2) + parseInt(category3) + parseInt(category4) + parseInt(category5);
    console.log(sum);
    setPoints(sum);
    data.score = sum;
    data.instrumentType = 1;
    data.riskLevel = determineRisklevel(sum);

    await AssessmentService.submit(data);
  };

  const value1 = watch(`category1`);
  const value2 = watch(`category2`);
  const value3 = watch(`category3`);
  const value4 = watch(`category4`);
  const value5 = watch(`category5`);

  useEffect(() => {
    const sum = parseInt(value1) + parseInt(value2) + parseInt(value3) + parseInt(value4) + parseInt(value5);
    setPoints(isNaN(sum) ? 0 : sum);
  }, [ value1, value2, value3, value4, value5 ]);

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  // const onSubmit = async (data) => {
  //  await AssessmentService.submit(data);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Cat Behavioral Instrument</h1>
      <h3> Points: {points} </h3>
      <div className="container">
        <label htmlFor="firstName">What is the Cat Name?</label>
        <input type="text" {...register(`catName`, { required: true })} placeholder="Cat Name" />
      </div>
      <div className="container">
        <label htmlFor="firstName">What is the Cats Date of Birth?</label>
        <input type="date" {...register(`catDateOfBirth`, { required: true })} placeholder="BirthDate" />
      </div>
      <div className="container">
        <label htmlFor="category1">Previous contact with the Cat Judicial System</label>
        <select {...register(`category1`, { required: true })}>
          <option value="">Select...</option>
          <option value={categoryPoints.value0}>No</option>
          <option value={categoryPoints.value1}>Yes</option>
        </select>
      </div>
      <div className="container">
        <label htmlFor="category2">Physical altercations with other cats</label>
        <select {...register(`category2`, { required: true })}>
          <option value="">Select...</option>
          <option value={categoryPoints.value0}>0-3 altercations</option>
          <option value={categoryPoints.value1}>3+ altercations</option>
        </select>
      </div>
      <div className="container">
        <label htmlFor="category3">Physical altercations with owner (scratching, biting, etc...)</label>
        <select {...register(`category3`, { required: true })}>
          <option value="">Select...</option>
          <option value={categoryPoints.value1}>10+ altercations</option>
          <option value={categoryPoints.value0}>0-10 altercations</option>
        </select>
      </div>
      <div className="container">
        <label htmlFor="category4">Plays well with dogs</label>
        <select {...register(`category4`, { required: true })}>
          <option value="">Select...</option>
          <option value={categoryPoints.value1}>No</option>
          <option value={categoryPoints.value0}>Yes</option>
        </select>
      </div>
      <div className="container">
        <label htmlFor="category5">Hisses at Strangers</label>
        <select {...register(`category5`, { required: true })}>
          <option value="">Select...</option>
          <option value={categoryPoints.value0}>No</option>
          <option value={categoryPoints.value1}>Yes</option>
        </select>
      </div>
      <div className="container">
        <input type="submit" />
      </div>
    </form>
  );
};

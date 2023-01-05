import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  const { formState: { errors }, handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  // const onSubmit = async (data) => {
  //  await AssessmentService.submit(data);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Cat Behavioral Instrument</h1>
      <div className="container">
        <label htmlFor="firstName">What is the Cat Name?</label>
        <input type="text" {...register(`firstName`, { required: true })} placeholder="Cat Name" />
      </div>
      <div className="container">
        <label htmlFor="firstName">What is the Cats Date of Birth?</label>
        <input type="date" {...register(`dateOfBirth`, { required: true })} placeholder="BirthDate" />
      </div>
      <div className="container">
        <label htmlFor="category1">Previous contact with the Cat Judicial System</label>
        <select {...register(`category1`, { required: true })}>
          <option value="">Select...</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="container">
        <label htmlFor="category2">Physical altercations with other cats</label>
        <select {...register(`category2`, { required: true })}>
          <option value="">Select...</option>
          <option value="0">0-3 altercations</option>
          <option value="1">3+ altercations</option>
        </select>
      </div>
      <div className="container">
        <label htmlFor="category3">Physical altercations with owner (scratching, biting, etc...)</label>
        <select {...register(`category3`, { required: true })}>
          <option value="">Select...</option>
          <option value="1">10+ altercations</option>
          <option value="0">0-10 altercations</option>
        </select>
      </div>
      <div className="container">
        <label htmlFor="category4">Plays well with dogs</label>
        <select {...register(`category4`, { required: true })}>
          <option value="">Select...</option>
          <option value="1">No</option>
          <option value="0">Yes</option>
        </select>
      </div>
      <div className="container">
        <label htmlFor="category5">Hisses at Strangers</label>
        <select {...register(`category5`, { required: true })}>
          <option value="">Select...</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="container">
        <input type="submit" />
      </div>
    </form>
  );
};

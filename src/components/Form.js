//@flow
import *as React from 'react';
import { Formik } from "formik"


const Form = ({ handleSubmit, ...props }) => {
    return (
        <Formik
            initialValues={{ formValue: '' }}
            validate={values => {
                const errors = {};
                if (!values.formValue) {
                    errors.formValue = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { resetForm }) => {
                handleSubmit(values)
                resetForm({ values: { formValue: '' } })
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                ...props
            }) => (
                    <>
                        {errors.formValue && touched.formValue && errors.formValue}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="formValue"
                                    className="form-control"
                                    placeholder="Введите название разметки"
                                    value={values.formValue}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </form>
                    </>
                )
            }
        </Formik>
    )
}

export default Form
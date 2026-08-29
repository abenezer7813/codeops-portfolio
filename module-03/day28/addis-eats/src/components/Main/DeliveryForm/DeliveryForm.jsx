import { func } from 'prop-types'
import React, { useState } from 'react'
import './DeliveryForm.css'
function DeliveryForm() {
    const [form, setForm] = useState({
        name: '', phone: '', area: ''
    })
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;

        // Update form
        setForm({
            ...form,
            [name]: value
        });

        // Validate the changed field
        if (name === "name") {
            if (!value.trim()) {
                setErrors({
                    ...errors,
                    name: "Name is required"
                });
            } else {
                setErrors({
                    ...errors,
                    name: ""
                });
            }
        }

        if (name === "phone") {
            if (!value.trim()) {
                setErrors({
                    ...errors,
                    phone: "Phone number is required"
                });
            } else if (!/^09\d{8}$/.test(value)) {
                setErrors({
                    ...errors,
                    phone: "Enter a valid phone number"
                });
            } else {
                setErrors({
                    ...errors,
                    phone: ""
                });
            }
        }
    }
    return (
        <div className='delivery-form'>
            <form action="">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' name='name'
                        onChange={handleChange} />
                    {errors.name && <p className='error'>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="name">Phone</label>
                    <input type='tel' name='phone' id='phone'
                        onChange={handleChange} />
                    {errors.phone && <p className='error'>{errors.phone}</p>}
                </div>

                <div>
                    <label htmlFor="name">Address</label>
                    <select name="address" id="address">
                        <option value="bole">bole</option>
                        <option value="mexico">mexico</option>
                        <option value="megenagna">megenagna</option>
                    </select>
                </div>
                <div><button disabled={
                    Object.values(errors).some(error => error !== "") ||
                    !form.name ||
                    !form.phone
                }>Pay with TeleBirr</button></div>
            </form>
        </div>
    )
}

export default DeliveryForm
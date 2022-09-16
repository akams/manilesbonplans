import {
  InputText as ControlledInputText,
} from '@Molecules'


const ShippingDeliveryAddress = () => {
  const rulesFields = {
    name: {
      rules: {
        required: true,
      },
    },
    street: {
      rules: {
        required: true,
      },
    },
    city: {
      rules: {
        required: true,
      },
    },
    country: {
      disabled: true,
      rules: {
        required: true,
      },
    },
    zipCode: {
      rules: {
        required: true,
      },
    },
    tel: {
      rules: {
        required: true,
      },
    },
  }
  return (
    <div>
      <ControlledInputText
        placeholder="Name"
        name="deliveryAddressName"
        rules={rulesFields.name.rules}
      />

      <ControlledInputText
        placeholder="Street"
        name="deliveryAddressStreet"
        rules={rulesFields.street.rules}
      />

      <ControlledInputText
        placeholder="ZipCode"
        name="deliveryAddressZipCode"
        rules={rulesFields.zipCode.rules}
      />

      <ControlledInputText
        placeholder="City"
        name="deliveryAddressCity"
        rules={rulesFields.city.rules}
      />

      <ControlledInputText
        placeholder="Country"
        name="deliveryAddressCountry"
        rules={rulesFields.country.rules}
        disabled={rulesFields.country.disabled}
      />

      <ControlledInputText
        type='tel'
        placeholder="Tél"
        name="deliveryAddressTel"
        rules={rulesFields.tel.rules}
      />
    </div>
  )
}

export default ShippingDeliveryAddress

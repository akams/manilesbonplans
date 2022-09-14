import {
  InputText as ControlledInputText,
} from '@Molecules'


const ShippingBillingAddress = () => {
  const billingAddressName = 'billingAddress'
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
        name={`${billingAddressName}.name`}
        rules={rulesFields.name.rules}
      />

      <ControlledInputText
        placeholder="Street"
        name={`${billingAddressName}.street`}
        rules={rulesFields.street.rules}
      />

      <ControlledInputText
        placeholder="ZipCode"
        name={`${billingAddressName}.zipCode`}
        rules={rulesFields.zipCode.rules}
      />

      <ControlledInputText
        placeholder="City"
        name={`${billingAddressName}.city`}
        rules={rulesFields.city.rules}
      />

      <ControlledInputText
        placeholder="Country"
        name={`${billingAddressName}.country`}
        rules={rulesFields.country.rules}
        disabled={rulesFields.country.disabled}
      />

      <ControlledInputText
        type='tel'
        placeholder="Tél"
        name={`${billingAddressName}.tel`}
        rules={rulesFields.tel.rules}
      />
    </div>
  )
}

export default ShippingBillingAddress

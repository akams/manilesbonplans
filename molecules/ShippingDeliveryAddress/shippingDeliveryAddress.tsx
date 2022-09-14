import {
  InputText as ControlledInputText,
} from '@Molecules'


const ShippingDeliveryAddress = () => {
  const deliveryAddressName = 'deliveryAddress'
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
        name={`${deliveryAddressName}.name`}
        rules={rulesFields.name.rules}
      />

      <ControlledInputText
        placeholder="Street"
        name={`${deliveryAddressName}.street`}
        rules={rulesFields.street.rules}
      />

      <ControlledInputText
        placeholder="ZipCode"
        name={`${deliveryAddressName}.zipCode`}
        rules={rulesFields.zipCode.rules}
      />

      <ControlledInputText
        placeholder="City"
        name={`${deliveryAddressName}.city`}
        rules={rulesFields.city.rules}
      />

      <ControlledInputText
        placeholder="Country"
        name={`${deliveryAddressName}.country`}
        rules={rulesFields.country.rules}
        disabled={rulesFields.country.disabled}
      />

      <ControlledInputText
        type='tel'
        placeholder="Tél"
        name={`${deliveryAddressName}.tel`}
        rules={rulesFields.tel.rules}
      />
    </div>
  )
}

export default ShippingDeliveryAddress

type ValidatorTypes = {
  field: string
  message: string
}

interface ValidatorProps {
  data: object
  validate: Array<ValidatorTypes>
}

export default class Validator {
  data: object
  validate: Array<ValidatorTypes>

  /**
   * @param props.data template with the data sent
   * @param props.validate field name and error message
   */
  constructor (props: ValidatorProps) {
    this.data = props.data
    this.validate = props.validate
  }

  /**
   * Checks if the field has been entered
   */
  check = () => {
    const dataKeys = Object.keys(this.data)

    dataKeys.forEach((key) => {
      if (this.isObject(this.data[key])) {
        const subDataKeys = Object.keys(this.data[key])
        subDataKeys.forEach((subDataKey) => {
          this.validData(this.data[key][subDataKey], subDataKey)
        })
      }

      this.validData(this.data[key], key)
    })

    return dataKeys
  }

  private validData = (data: unknown, key: string) => {
    if (!data || data === '') {
      const validation = this.validate.find((validateData) => {
        return validateData.field === key
      })

      throw new Error(validation.message)
    }
  }

  private isObject = (obj: unknown) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
}

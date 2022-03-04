type ValidatorTypes = {
  field: string
  message: string,
  ignore?: boolean|null|undefined
}

export default class Validator {
  validate: Array<ValidatorTypes>

  /**
   * @param props.validate field name and error message
   */
  constructor (validate: Array<ValidatorTypes>) {
    this.validate = validate
  }

  /**
   * Checks if the field has been entered
   */
  check = (data: unknown) => {
    const dataKeys = Object.keys(data)

    dataKeys.forEach((key) => {
      this.validData(data[key], key)

      if (this.isObject(data[key])) {
        const subDataKeys = Object.keys(data[key])

        subDataKeys.forEach((subDataKey) => {
          this.validData(data[key][subDataKey], subDataKey)
        })
      }
    })

    return dataKeys
  }

  private validData = (data: unknown, key: string) => {
    if (!data || data === '') {
      this.validate.forEach((validateData) => {
        if (!validateData.ignore) {
          if (validateData.field === key) {
            throw new Error(validateData.message)
          }
        }
      })
    }
  }

  private isObject = (obj: unknown) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
}

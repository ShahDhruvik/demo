type optionType = {
  value: string
  label: string
  nextQuestionId: number
  treatmentId: number
}

export type QnaFields = {
  _id: string
  question: string
  questionId: number
  isFinal: boolean
  type: string
  options: {
    value: string
    label: string
    nextQuestionId: number
    treatmentId: number
  }[]
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  // treatmentPlan: { label: string; _id: string }
}

export type QnaFormFields = {
  question: string
  answer: string
  questionId: number
  isFinal: boolean
  options: optionType[]
  type: string
}

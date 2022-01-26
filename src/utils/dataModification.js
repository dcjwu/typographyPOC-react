export const convertToYesNo = value => {
   if (value === 0) return "no"
   else if (value === 1) return "yes"
   else return "Unexpected value"
}
import * as yup from 'yup'

export const postsSchema = yup.object().shape({
    fowner: yup.string(),
    fownerid: yup.string(),
    fcontent1: yup.string().required(),
    fcontent2: yup.string(),
    fcontent3: yup.string(),
    fcontent4: yup.string(),
    fcaption: yup.string()
    
});
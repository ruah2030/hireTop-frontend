import * as Yup from 'yup';
export const BusinessSchema  = Yup.object().shape({
  overview: Yup.string().required('Ce champs est requis'),
  history: Yup.string().required('Ce champs est requis'),
  culture: Yup.string().required('Ce champs est requis'),
  org_name: Yup.string().required('Ce champs est requis'),
});


export const UpdateUserSchema =Yup.object().shape({
  first_name:Yup.string().required("Ce champs est requis"),
  last_name:Yup.string().required("Ce champs est requis"),
  occupation:Yup.string().required("Ce champs est requis"),
  email:Yup.string().required("Ce champs est requis").email("Email invalide"),
});

export const SecuritySchema =Yup.object().shape({
  old_password:Yup
    .string()
    .required("Ce champs requis")
    .min(8, "Ce champs doit contenir au minimun 8 charactère"),
  new_password:Yup
    .string()
    .required("Ce champs requis")
    .min(8, "Ce champs doit contenir au minimun 8 charactère"),

  password_confirmation:Yup
    .string()
    .required("Ce champs est requis")
    .oneOf([Yup.ref("new_password")], "Doit être identique aux mot de passe"),
});
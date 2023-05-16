import Joi from "joi";
export interface bodyRequest {
    name: string,
    description: string,
    logo: string,
    coverImage: string,
  }
const shopValidation = {
    create:{
        backend: (bodyData:bodyRequest) =>{
                const schema = Joi.object({
                    name: Joi.string().min(2).max(50).required(),
                    description: Joi.string().max(350).required(),
                    logo: Joi.string().max(2500).allow("",null),
                    coverImage: Joi.string().max(2500).allow("",null),
                })
                return schema.validate(bodyData);
        },
        frontend: () =>{
            const schema = Joi.object({
                shopName: Joi.string().min(2).max(50).required().messages({
                    "string.empty": "Name is required",
                    "string.min": "Name should have a minimum length of {#limit}",
                    "string.max": "Name should have a maximum length of {#limit}",
                }),
                shopDescription: Joi.string().max(350).required().messages({
                    "string.empty": "Description is required",
                    "string.max": "Description should have a maximum length of {#limit}",
                }),
                logo: Joi.string().max(2500).allow("",null).messages({
                    "string.max": "Logo should have a maximum length of {#limit}",
                }),
                coverImage: Joi.string().max(2500).allow("",null).messages({
                    "string.max": "Cover Image should have a maximum length of {#limit}",
                }),
            })
            return schema;
        }
    }
}

export default shopValidation;

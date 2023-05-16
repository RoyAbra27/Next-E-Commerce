import Joi from "joi";
export interface bodyRequest {
    name: string,
    description: string,
    logo: string,
    coverImage: string,
  }
const shopValidation = {
    create(bodyData:bodyRequest){
        const schema = Joi.object({
            name: Joi.string().min(2).max(50).required(),
            description: Joi.string().max(350).required(),
            logo: Joi.string().max(2500).allow("",null),
            coverImage: Joi.string().max(2500).allow("",null),
        })
        return schema.validate(bodyData);
    }
};

export default shopValidation;

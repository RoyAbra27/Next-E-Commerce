import { createShopFields } from "@/types/shop/shop";
import Joi from "joi";


const shopValidation = {
  create: {
    backend: (bodyData: createShopFields) => {
      const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().max(350).required(),
        logo: Joi.string().max(2500).allow("", null),
        coverImage: Joi.string().max(2500).allow("", null),
      });
      return schema.validate(bodyData);
    },
    frontend: () => {
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
        logo: Joi.object().allow("", null),
        coverImage: Joi.object().allow("", null)
      });
      return schema;
    },
  },
};

export default shopValidation;

import { ZodError } from 'zod';
import { CreateCompanySchema } from './create-company.shcema';

module.exports = function validateData(req, res, next) {
  try {
    CreateCompanySchema.parse(req.body);
    
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue) => ({
        message: `${issue.path.join('.')} is ${issue.message}`,
      }));
      res.status(400).json({ error: 'Invalid data', details: errorMessages });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

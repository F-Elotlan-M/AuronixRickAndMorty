export function validatePageNumber(req, res, next) {
    const { pageNumber } = req.params;
  
    const isValid = Number.isInteger(Number(pageNumber)) && Number(pageNumber) > 0;
  
    if (!isValid) {
      return res.status(400).json({ error: 'pageNumber must be a positive integer' });
    }
  
    next();
  }
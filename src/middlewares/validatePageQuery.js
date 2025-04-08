export const validatePageQuery = (req, res, next) => {
    const { page } = req.query;
    
    if (!page || isNaN(page)) {
      return res.status(400).json({ error: 'The page must be a numeric value' });
    }
  
    next();
  };
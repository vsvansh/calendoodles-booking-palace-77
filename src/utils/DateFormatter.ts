
import { parse, format, isValid } from "date-fns";

export const formatDateInput = (input: string): string => {
  // If the input already contains dashes, don't modify it
  if (input.includes('-')) {
    return input;
  }

  // Remove any non-digit characters
  let digits = input.replace(/\D/g, '');
  
  // Format as DD-MM-YYYY
  if (digits.length > 0) {
    // Add day part
    let result = digits.substring(0, 2);
    
    // Add month part with dash
    if (digits.length > 2) {
      result += '-' + digits.substring(2, 4);
      
      // Add year part with dash
      if (digits.length > 4) {
        result += '-' + digits.substring(4, 8);
      }
    }
    
    // Automatically format as user types
    if (digits.length === 4 && !input.includes('-')) {
      // Add "-" after day and month
      result = digits.substring(0, 2) + '-' + digits.substring(2, 4);
    } else if (digits.length >= 6 && !input.includes('-')) {
      // Add "-" after day and month in longer input
      result = digits.substring(0, 2) + '-' + digits.substring(2, 4) + '-' + digits.substring(4);
    }
    
    return result;
  }
  
  return input;
};

export const parseFormattedDate = (dateString: string): Date | null => {
  try {
    // Try to parse DD-MM-YYYY format
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
      const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
      if (isValid(parsedDate)) return parsedDate;
    }
    
    // Try to parse DD/MM/YYYY format
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
      if (isValid(parsedDate)) return parsedDate;
    }
    
    // Try standard date format
    const standardDate = new Date(dateString);
    if (isValid(standardDate)) return standardDate;
    
    return null;
  } catch (error) {
    return null;
  }
};

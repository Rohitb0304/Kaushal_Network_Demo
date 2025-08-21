import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Check, AlertCircle, Eye, EyeOff, Info } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onValidationChange?: (isValid: boolean) => void;
  validationRules?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
  showPasswordToggle?: boolean;
  compareWith?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal' | 'search' | 'url';
  showStrengthIndicator?: boolean;
}

export const Input: React.FC<InputProps> = ({
  className = '',
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  onValidationChange,
  validationRules,
  showPasswordToggle = false,
  compareWith,
  type = 'text',
  onChange,
  onBlur,
  onFocus,
  value = '',
  inputMode,
  showStrengthIndicator = false,
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [internalError, setInternalError] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const actualType = showPasswordToggle && showPassword ? 'text' : type;
  const displayError = error || internalError;
  const stringValue = value?.toString() || '';

  // Password strength calculation
  const calculatePasswordStrength = useCallback((password: string): number => {
    if (!password) return 0;

    let strength = 0;
    const checks = [
      password.length >= 8, // Length
      /[a-z]/.test(password), // Lowercase
      /[A-Z]/.test(password), // Uppercase
      /\d/.test(password), // Numbers
      /[^a-zA-Z0-9]/.test(password), // Special chars
      password.length >= 12, // Extra length bonus
    ];

    strength = checks.filter(Boolean).length;
    return Math.min(strength, 5);
  }, []);

  // Advanced input formatting and sanitization
  const formatValue = useCallback(
    (inputValue: string, inputType: string, inputMode?: string): string => {
      if (!inputValue) return '';

      let formatted = inputValue;

      // Handle different input modes and types
      switch (inputMode || inputType) {
        case 'numeric':
        case 'tel':
          // Allow only numbers, +, -, (, ), and spaces for phone numbers
          formatted = formatted.replace(/[^\d+\-\s()]/g, '');
          break;

        case 'decimal':
          // Allow numbers and single decimal point
          formatted = formatted.replace(/[^\d.]/g, '');
          const parts = formatted.split('.');
          if (parts.length > 2) {
            formatted = parts[0] + '.' + parts.slice(1).join('');
          }
          break;

        case 'email':
          // Convert to lowercase and trim
          formatted = formatted.toLowerCase().trim();
          break;

        case 'url':
          // Trim and convert to lowercase
          formatted = formatted.trim().toLowerCase();
          break;

        default:
          // For text inputs, trim whitespace unless it's a password
          if (inputType !== 'password' && !showPasswordToggle) {
            formatted = formatted.trim();
          }
          break;
      }

      // Apply maxLength if specified
      if (validationRules?.maxLength && formatted.length > validationRules.maxLength) {
        formatted = formatted.slice(0, validationRules.maxLength);
      }

      return formatted;
    },
    [validationRules?.maxLength, showPasswordToggle]
  );

  // Enhanced validation with detailed error messages
  const validateInput = useCallback(
    (inputValue: string): string | null => {
      if (!validationRules && !compareWith) return null;

      const { required, minLength, maxLength, pattern, custom } = validationRules || {};

      // Required validation
      if (required && !inputValue.trim()) {
        return `${label || 'This field'} is required`;
      }

      // Skip other validations if empty and not required
      if (!inputValue.trim() && !required) {
        return null;
      }

      // Length validations with specific messages
      if (minLength && inputValue.length < minLength) {
        if (type === 'password') {
          return `Password must be at least ${minLength} characters long`;
        }
        return `Must be at least ${minLength} characters`;
      }

      if (maxLength && inputValue.length > maxLength) {
        return `Must not exceed ${maxLength} characters`;
      }

      // Pattern validation with context-specific messages
      if (pattern && !pattern.test(inputValue)) {
        switch (type) {
          case 'email':
            return 'Please enter a valid email address (e.g., user@example.com)';
          case 'tel':
            return 'Please enter a valid phone number';
          default:
            if (inputMode === 'numeric') {
              return 'Please enter numbers only';
            }
            return 'Invalid format';
        }
      }

      // Password confirmation
      if (compareWith !== undefined) {
        return inputValue === compareWith ? null : 'Passwords do not match';
      }

      // Custom validation
      if (custom) {
        return custom(inputValue);
      }

      return null;
    },
    [validationRules, compareWith, label, type, inputMode]
  );

  // Effect for password confirmation and strength
  useEffect(() => {
    if (compareWith !== undefined && stringValue) {
      const match = stringValue === compareWith;
      const validationError = match ? null : 'Passwords do not match';
      setInternalError(validationError || '');
      setIsValid(match);

      if (onValidationChange) {
        onValidationChange(match);
      }
    }

    // Calculate password strength
    if (showStrengthIndicator && type === 'password') {
      setPasswordStrength(calculatePasswordStrength(stringValue));
    }
  }, [
    compareWith,
    stringValue,
    onValidationChange,
    showStrengthIndicator,
    type,
    calculatePasswordStrength,
  ]);

  // Enhanced change handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formattedValue = formatValue(rawValue, actualType, inputMode);

      // Update input value if formatting changed
      if (formattedValue !== rawValue && inputRef.current) {
        inputRef.current.value = formattedValue;
      }

      setIsFirstLoad(false);

      // Skip validation for confirm password fields (handled by effect)
      if (compareWith === undefined) {
        const validationError = validateInput(formattedValue);
        setInternalError(validationError || '');

        const valid = !validationError && formattedValue.length > 0;
        setIsValid(valid);

        if (onValidationChange) {
          onValidationChange(valid);
        }
      }

      // Call original onChange with formatted value
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: formattedValue },
        };
        onChange(syntheticEvent);
      }
    },
    [actualType, inputMode, formatValue, compareWith, validateInput, onValidationChange, onChange]
  );

  // Enhanced blur handler
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setIsFirstLoad(false);

      const value = e.target.value;

      if (compareWith === undefined) {
        const validationError = validateInput(value);
        setInternalError(validationError || '');

        const valid = !validationError && value.length > 0;
        setIsValid(valid);

        if (onValidationChange) {
          onValidationChange(valid);
        }
      }

      if (onBlur) {
        onBlur(e);
      }
    },
    [compareWith, validateInput, onValidationChange, onBlur]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus]
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // State calculations
  const hasError = displayError && displayError.length > 0 && !isFirstLoad;
  const hasSuccess = success || (isValid === true && !hasError && !isFirstLoad);
  const showValidationState = !isFirstLoad || isFocused;

  // Password strength colors and labels
  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-blue-500';
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      case 5:
        return 'Very Strong';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className={`block text-sm font-semibold transition-colors duration-200 ${
            hasError ? 'text-red-700' : hasSuccess ? 'text-green-700' : 'text-gray-700'
          }`}
        >
          {label}
          {validationRules?.required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div
              className={`transition-all duration-300 ${
                hasError
                  ? 'text-red-500 scale-110'
                  : hasSuccess
                    ? 'text-green-500 scale-110'
                    : isFocused
                      ? 'text-blue-500 scale-110'
                      : 'text-gray-400'
              }`}
            >
              {leftIcon}
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type={actualType}
          inputMode={inputMode}
          className={`
            w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ease-out
            placeholder:text-gray-400 text-gray-900 bg-white font-medium
            focus:outline-none focus:ring-4 focus:scale-[1.02] transform-gpu
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed disabled:scale-100
            ${leftIcon ? 'pl-12' : 'pl-4'}
            ${rightIcon || showPasswordToggle || (showValidationState && (hasError || hasSuccess)) ? 'pr-12' : 'pr-4'}
            ${
              hasError
                ? 'border-red-400 focus:border-red-500 focus:ring-red-100 shadow-red-100'
                : hasSuccess
                  ? 'border-green-400 focus:border-green-500 focus:ring-green-100 shadow-green-100'
                  : isFocused
                    ? 'border-blue-500 focus:border-blue-600 focus:ring-blue-100 shadow-blue-100'
                    : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
            }
            ${disabled ? 'opacity-60' : ''}
            ${className}
          `}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          aria-invalid={hasError}
          aria-describedby={displayError || helperText ? `${props.name}-description` : undefined}
          value={stringValue}
          disabled={disabled}
          {...props}
        />

        {/* Right Icons Container */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          {/* Validation Icons */}
          {showValidationState && hasError && (
            <div className="animate-shake">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
          {showValidationState && hasSuccess && (
            <div className="animate-bounce-once">
              <Check className="w-5 h-5 text-green-500" />
            </div>
          )}

          {/* Password Toggle */}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600 transition-all duration-200 p-1 rounded-md hover:bg-gray-100"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}

          {/* Custom Right Icon */}
          {rightIcon && !showValidationState && <div className="text-gray-400">{rightIcon}</div>}
        </div>

        {/* Focus Ring Animation */}
        {isFocused && (
          <div
            className={`absolute inset-0 rounded-xl border-2 pointer-events-none animate-pulse ${
              hasError ? 'border-red-400' : hasSuccess ? 'border-green-400' : 'border-blue-400'
            }`}
          />
        )}
      </div>

      {/* Password Strength Indicator */}
      {showStrengthIndicator && type === 'password' && stringValue && (
        <div className="space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 font-medium">Password strength:</span>
            <span
              className={`font-semibold ${
                passwordStrength <= 2
                  ? 'text-red-600'
                  : passwordStrength <= 3
                    ? 'text-yellow-600'
                    : 'text-green-600'
              }`}
            >
              {getStrengthLabel(passwordStrength)}
            </span>
          </div>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(level => (
              <div
                key={level}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  level <= passwordStrength ? getStrengthColor(passwordStrength) : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Helper Text & Error Messages */}
      {(displayError || helperText) && (
        <div
          id={`${props.name}-description`}
          className={`text-sm transition-all duration-300 flex items-start gap-2 ${
            displayError ? 'text-red-600 animate-slideDown' : 'text-gray-500'
          }`}
        >
          {displayError && <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />}
          <span>{displayError || helperText}</span>
        </div>
      )}
    </div>
  );
};

// Add custom animations to your CSS
const styles = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

@keyframes bounce-once {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-bounce-once {
  animation: bounce-once 0.6s ease-out;
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideDown {
  animation: slideDown 0.3s ease-out;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

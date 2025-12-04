import styled, { css } from "styled-components";

const baseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-weight: 600;
  border-radius: 999px;
  cursor: pointer;
  border: none;
  outline: none;

  transition: background-color 0.15s ease, color 0.15s ease,
    box-shadow 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
`;

const sizeStyles = {
  sm: css`
    font-size: 0.8rem;
    padding: 6px 14px;
  `,
  md: css`
    font-size: 0.9rem;
    padding: 8px 18px;
  `,
  lg: css`
    font-size: 0.95rem;
    padding: 10px 24px;
  `,
};

const variantSolid = css`
  background-color: #ff782d;
  color: #ffffff;
  box-shadow: 0 12px 30px rgba(255, 120, 45, 0.45);

  &:hover {
    background-color: #ff6a14;
    transform: translateY(-1px);
  }
`;

const variantOutline = css`
  background-color: #ffffff;
  color: #111827;
  border: 1px solid #ff782d;

  &:hover {
    background-color: #ff782d;
    color: #ffffff;
    box-shadow: 0 8px 20px rgba(255, 120, 45, 0.35);
  }
`;

const variantIcon = css`
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    border-color: #ff782d;
    box-shadow: 0 8px 22px rgba(255, 120, 45, 0.3);
  }
`;

const StyledButton = styled.button`
  ${baseStyles};
  ${({ size }) => sizeStyles[size || "md"]};

  ${({ variant }) => {
    if (variant === "outline") return variantOutline;
    if (variant === "icon") return variantIcon;
    return variantSolid;
  }};
`;

export default function PrimaryButton({
  children,
  variant = "solid",
  size = "md",
  as = "button",
  ...rest
}) {
  return (
    <StyledButton as={as} variant={variant} size={size} {...rest}>
      {children}
    </StyledButton>
  );
}

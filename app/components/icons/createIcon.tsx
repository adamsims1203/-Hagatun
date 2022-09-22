interface CreateIconProps {
  displayName: string;
  icon: React.ElementType;
  alt?: string;
  ariaLabel?: string;
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  fontSize?: string | number;
  color?: string;
  alt?: string;
  ariaLabel?: string;
}

export const createIcon = ({
  icon: Component,
  displayName,
  alt: defaultAlt,
  ariaLabel: defaultAriaLabel
}: CreateIconProps) => {
  const Icon = ({
    fontSize,
    color,
    alt,
    ariaLabel,
    style,
    ...props
  }: IconProps) => {
    alt ||= defaultAlt;
    ariaLabel ||= defaultAriaLabel;

    props = {
      'aria-hidden': alt || ariaLabel ? undefined : 'true',
      'aria-label': ariaLabel,
      ...props
    };

    style = {
      fontSize,
      color,
      ...(style ?? null)
    };

    return (
      <Component
        style={style}
        {...props}
      />
    );
  };

  Icon.displayName = displayName;

  return Icon;
};

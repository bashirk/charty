import { FC } from 'react';
import { Badge } from './ui/badge';

interface BalanceProps {
  creditsRemaining: number | null | undefined;
  creditsLoading: boolean;
}

export const Balance: FC<BalanceProps> = ({
  creditsRemaining,
  creditsLoading,
}) => {
  if (creditsLoading) {
    return (
      <div>Please wait...</div> // replace with your loading state
    );
  }

  if (typeof creditsRemaining === 'undefined') {
    return (
      <div>Error: No credit information available.</div> // replace with your error state
    );
  }

  return (
    <>
      <Badge className="font-sans font-medium sm:hidden flex">
        {creditsRemaining} tokens
      </Badge>
      <Badge className="font-sans font-medium hidden sm:flex">
        {creditsRemaining} tokens
      </Badge>
    </>
  );
};

export default Balance;

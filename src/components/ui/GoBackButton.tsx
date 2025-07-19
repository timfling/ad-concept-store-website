'use client';
import { useRouter } from 'next/navigation';

const GoBackButton = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="inline-block text-accent text-sm border border-separator rounded px-3 py-1 hover:bg-secondary transition-colors"
      onClick={() => router.back()}
    >
      &larr; Return to Catalog
    </button>
  );
};

export default GoBackButton;

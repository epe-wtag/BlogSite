export function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }
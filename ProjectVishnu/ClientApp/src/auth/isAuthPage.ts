export default function isAuthPage(pathanem: string): boolean {
  switch (pathanem) {
    default:
      return false;
    case "/login":
      return true;
  }
}

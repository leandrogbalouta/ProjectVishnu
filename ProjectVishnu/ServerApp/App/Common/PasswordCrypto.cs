using System;
using System.Security.Cryptography;

namespace ProjectVishnu.ServerApp.App.Common
{
    public static class PasswordCrypto
    {
        private const int _keySize = 32; // 256 bits
        private const int _iterations = 100000;
        private static readonly HashAlgorithmName _algorithm = HashAlgorithmName.SHA256;

        public static string Hash(string input)
        {
            using var hashAlgorithm = HashAlgorithm.Create(_algorithm.Name);
            var hashBytes = hashAlgorithm.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
            return Convert.ToHexString(hashBytes);
        }

        public static bool Verify(string input, string hashString)
        {
            var hashBytes = Convert.FromHexString(hashString);
            using var hashAlgorithm = HashAlgorithm.Create(_algorithm.Name);
            var inputHashBytes = hashAlgorithm.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
            return CryptographicOperations.FixedTimeEquals(inputHashBytes, hashBytes);
        }
    }
}

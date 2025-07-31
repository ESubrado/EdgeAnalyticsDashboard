import { useMemo } from 'react';

/**
 * A custom React Hook to parse a string into an enum value based on the enum's key names.
 *
 * @template TEnum The type of the enum.
 * @param {TEnum} enumObject The enum object itself (e.g., MyEnum).
 * @returns {((inputString: string) => TEnum[keyof TEnum] | undefined)} A function that takes a string
 * and returns the corresponding enum value or undefined if no match is found.
 */
function useParseEnumFromString<TEnum extends Record<string, string | number>>(
  enumObject: TEnum
): (inputString: string) => TEnum[keyof TEnum] | undefined {
        const enumKeys = useMemo(() => Object.keys(enumObject), [enumObject]);
        const enumValues = useMemo(() => Object.values(enumObject), [enumObject]);

        const parseString = (inputString: string): TEnum[keyof TEnum] | undefined => {
            // Check if the input string directly matches a key name
            if (enumKeys.includes(inputString)) {
            return enumObject[inputString] as TEnum[keyof TEnum];
            }

            // If not a direct key match, try to find a value that matches (for string enums)
            const foundIndex = enumValues.indexOf(inputString);
            if (foundIndex !== -1) {
            // If a value matches, return the corresponding key value, ommitted by essubrado
            return enumKeys[foundIndex] as TEnum[keyof TEnum];
            }

            return undefined; // No matching enum key or value found
        };

        return parseString;
}

export default useParseEnumFromString;
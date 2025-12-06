export type SerializablePrimitive = string | number | boolean | null;

export type SerializableValue =
  | SerializablePrimitive
  | SerializablePrimitive[]
  | { [key: string]: SerializableValue };

export type SerializableState = Record<string, SerializableValue | undefined>;

import { sql, type AnyColumn, type SQL } from "drizzle-orm";

/**
 * Returns the first element of an array.
 *
 * @template T - The type of the array elements.
 * @param {T[]} items - The array from which to retrieve the first element.
 * @returns {T} - The first element of the array.
 */
export function takeFirst<T>(items: T[]): T | undefined {
  return items.at(0);
}

/**
 * Returns the first item in the array or throws an error if the array is empty.
 *
 * @template T - The type of the items in the array.
 * @param {T[]} items - The array of items.
 * @returns {T} - The first item in the array.
 * @throws {Error} - Throws an error if the array is empty.
 */
export function takeFirstOrThrow<T>(items: T[]): T {
  const first = takeFirst(items);

  if (!first) {
    throw new Error("First item not found");
  }

  return first;
}

/**
 * Returns a SQL query string that selects distinct values from the specified column.
 *
 * @template Column - The type of the column.
 * @param {Column} column - The column to select distinct values from.
 * @returns {sql<Column["_"]["data"]>} - The SQL query string.
 */
export function distinct<Column extends AnyColumn>(
  column: Column
): SQL<Column["_"]["data"]> {
  return sql<Column["_"]["data"]>`distinct(${column})`;
}

/**
 * Returns a SQL expression that represents the maximum value of a column.
 *
 * @template Column - The type of the column.
 * @param {Column} column - The column to find the maximum value of.
 * @returns {SQLExpression<Column["_"]["data"]>} - A SQL expression representing the maximum value of the column.
 */
export function max<Column extends AnyColumn>(
  column: Column
): SQL<Column["_"]["data"]> {
  return sql<Column["_"]["data"]>`max(${column})`;
}

/**
 * Returns a SQL expression that counts the number of rows in a column.
 *
 * @param column - The column to count.
 * @returns A SQL expression representing the count of the column.
 */
export function count<Column extends AnyColumn>(column: Column): SQL<number> {
  return sql<number>`cast(count(${column}) as integer)`;
}

/**
 * Returns a SQL expression that represents the coalescing of two values.
 * If the first value is not null or undefined, it is returned. Otherwise, the default value is returned.
 *
 * @template T - The type of the value being coalesced.
 * @param {SQL.Aliased<T> | SQL<T>} value - The value to be coalesced.
 * @param {SQL} defaultValue - The default value to be returned if the first value is null or undefined.
 * @returns {SQL<T>} - The SQL expression representing the coalesced value.
 */
export function coalesce<T>(
  value: SQL.Aliased<T> | SQL<T>,
  defaultValue: SQL
): SQL<T> {
  return sql<T>`coalesce(${value}, ${defaultValue})`;
}

# Personal Drizzle Utilities

A collection of drizzle utilities to use in my projects.

## Usage 

```typescript
import { movies } from "./schema";
import { db } from "./db";
import { count } from "@nbbaier/drizzle-utils";

const response = await db
  .select({
    count: count(movies.id),
  })
  .from(movies);
```
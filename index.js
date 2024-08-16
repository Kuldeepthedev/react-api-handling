import { useDelete } from "./src/hooks/useDelete.js";
import { useGet } from "./src/hooks/useGet.js";
import { usePost } from "./src/hooks/usePost.js";
import { usePut } from "./src/hooks/usePut.js";

export { useDelete, useGet, usePost, usePut}
export { QueryClientProvider, queryClient } from './src/queryClient.js';
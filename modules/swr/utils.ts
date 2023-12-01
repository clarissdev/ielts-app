import nProgress from "nprogress";
import { mutate } from "swr";

// TODO: nprogress does not use lock counting, fix this
export async function shamelesslyRevalidateEverything() {
  nProgress.start();
  try {
    await mutate(() => true);
  } finally {
    nProgress.done();
  }
}

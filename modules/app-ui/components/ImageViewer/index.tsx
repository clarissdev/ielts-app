import cx from "clsx";
import Image from "next/image";
import * as React from "react";
import { MdOutlineBrokenImage } from "react-icons/md";

import styles from "./index.module.scss";
import { ImageFileHandle } from "@/modules/business-types";
import Flex from "../Flex";
import { CLIENT_ENV } from "@/modules/env/client";

const MAX_ASPECT_RATIO = 4;
const MIN_ASPECT_RATIO = 1 / MAX_ASPECT_RATIO;

const SIZING = {
  fill: styles.sizingFill,
  "auto-height": styles.sizingAutoHeight,
};

export function clamp(min: number, val: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

type OwnProps = {
  className?: string;
  style?: React.CSSProperties;
  value: ImageFileHandle | null | undefined;
  sizing: keyof typeof SIZING;
  objectFit?: "cover" | "contain";
  /**
   * https://nextjs.org/docs/api-reference/next/image#sizes
   * https://web.dev/learn/design/responsive-images/#sizes
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes
   */
  sizes: string | undefined;
  icons?: React.ReactNode[];
  preventAnimation?: boolean;
};

type ForwardedProps = React.ComponentProps<typeof Image>;

type Props = OwnProps & Omit<ForwardedProps, keyof OwnProps | "alt" | "src">;

type State = {
  hasError: boolean;
};

export class ImageViewer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_error: unknown) {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error(error);
    console.info(info);
  }

  render() {
    const {
      className,
      style,
      value,
      objectFit = "cover",
      sizes,
      sizing,
      icons,
    } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div
          className={cx(styles.container, className, styles.hasError)}
          style={style}
        >
          <MdOutlineBrokenImage />
        </div>
      );
    }

    if (!value) {
      return (
        <div
          className={cx(styles.container, className, styles.noImage)}
          style={style}
        ></div>
      );
    }

    const aspectRatio =
      value.blob.width && value.blob.height
        ? clamp(
            MIN_ASPECT_RATIO,
            value.blob.width / value.blob.height,
            MAX_ASPECT_RATIO
          )
        : undefined;

    return (
      <div
        className={cx(styles.container, className, SIZING[sizing])}
        style={Object.assign({ ...style }, { "--aspect-ratio": aspectRatio })}
      >
        <Image
          style={{ objectFit }}
          src={`https://${CLIENT_ENV.CLOUDFRONT_HOST}/blobs/${value.blob.blobId}`}
          alt=""
          sizes={sizes}
          fill
        />
        {icons ? (
          <Flex.Row
            className={styles.iconContainer}
            gap="12px"
            alignItems="center"
          >
            {icons}
          </Flex.Row>
        ) : null}
      </div>
    );
  }
}

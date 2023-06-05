import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

import {
  TextInput,
  Button,
  Container,
  MantineProvider,
  Center,
  Skeleton
} from "@mantine/core";
import { useInputState, useDebouncedValue } from "@mantine/hooks";

export default function App() {
  const [stringValue, setStringValue] = useInputState("");
  const [debounced] = useDebouncedValue(stringValue, 200);
  const svgRef = useRef<any>(null);

  function downloadSVG(): void {
    const ref = svgRef.current;
    const svg = ref.querySelector("svg") as SVGAElement;
    var serializedSVG = new XMLSerializer().serializeToString(svg);
    const anchor = document.createElement("a");
    anchor.href = "data:image/svg+xml;base64," + btoa(serializedSVG);
    anchor.download = "qrcode.svg";
    anchor.click();
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="sm" pt={50}>
        <Center>
          {debounced? (
            <div ref={svgRef}>
              <QRCodeSVG
                value={debounced}
                size={256}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
              />
            </div>
          ): 
          <Skeleton width={256} height={256} mb={7}/>
          }
        </Center>

        <TextInput
          my={20}
          value={stringValue}
          onChange={setStringValue}
          size="md"
          placeholder="QR oluşturmak için veri giriniz..."
        />

        <Center>
          {debounced && (
            <Button size="md" onClick={() => downloadSVG()}>SVG İndir</Button>
          )}
        </Center>
      </Container>
    </MantineProvider>
  );
}

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import React from 'react';
import { Plugin, RenderViewerProps, Slot } from '@phuocng/rpv';

import DropArea from './DropArea';

const dropPlugin = (): Plugin => {
    const renderViewer = (props: RenderViewerProps): Slot => {
        const { slot } = props;
        
        if (slot.attrs) {
            const styles = slot.attrs && slot.attrs.style ? slot.attrs.style : {};
            const updateStyle: React.CSSProperties = {
                ...styles,
                ...{
                    height: '100%',
                    position: 'relative',
                }
            };
            slot.attrs.style = updateStyle;
        }

        slot.children = (
            <>
            <DropArea containerRef={props.containerRef} openFile={props.openFile} />
            {slot.children}
            </>
        );

        return slot;
    };

    return {
        renderViewer,
    };
};

export default dropPlugin;

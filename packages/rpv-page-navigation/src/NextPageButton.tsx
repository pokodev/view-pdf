import React, { useEffect, useState } from 'react';
import { Button, NextIcon, Position, Store, StoreHandler, Tooltip } from '@phuocng/rpv';

import StoreProps from './StoreProps';

export interface RenderNextPageButtonProps {
    isDisabled: boolean;
    onClick: () => void;
}

export interface NextPageButtonProps {
    children?: ChildrenNextPageButton;
}

export type ChildrenNextPageButton = (props: RenderNextPageButtonProps) => React.ReactElement;

const TOOLTIP_OFFSET = { left: 0, top: 8 };

const NextPageButton: React.FC<{
    children?: ChildrenNextPageButton,
    store: Store<StoreProps>,
}> = ({ store, children }) => {
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const handleNumberOfPages: StoreHandler<number> = (n: number) => {
        setNumberOfPages(n);
    };
    const handleCurrentPageChanged: StoreHandler<number> = (currentPage: number) => {
        setCurrentPage(currentPage);
    };

    useEffect(() => {
        store.subscribe('currentPage', handleCurrentPageChanged);
        store.subscribe('numberOfPages', handleNumberOfPages);

        return () => {
            store.unsubscribe('currentPage', handleCurrentPageChanged);
            store.unsubscribe('numberOfPages', handleNumberOfPages);
        };
    }, []);

    const goToNextPage = () => {
        const jumpToPage = store.get('jumpToPage');
        if (jumpToPage) {
            jumpToPage(currentPage + 1);
        }
    };

    const defaultChildren = (props: RenderNextPageButtonProps) => (
        <Tooltip
            position={Position.BottomCenter}
            target={<Button onClick={props.onClick}><NextIcon /></Button>}
            content={() => 'Next page'}
            offset={TOOLTIP_OFFSET}
        />
    );
    const render = children || defaultChildren;

    return render({
        isDisabled: currentPage + 1 >= numberOfPages,
        onClick: goToNextPage,
    });
};

export default NextPageButton;

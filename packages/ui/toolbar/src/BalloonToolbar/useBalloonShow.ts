import { useCallback, useEffect, useState } from 'react';
import { useTimeoutFn } from 'react-use';
import { getSelectionText, isSelectionExpanded } from '@udecode/plate-common';
import { TEditor } from '@udecode/plate-core';

/**
 * Hide if not selecting.
 * If hiddenDelay = 0 and the selection changes: show.
 * If hiddenDelay > 0: hide when the selection length changes.
 */
export const useBalloonShow = ({
  editor,
  ref,
  hiddenDelay,
}: {
  editor?: TEditor;
  ref: any;
  hiddenDelay: number;
}) => {
  const [hidden, setHidden] = useState(true);

  const selectionExpanded = editor && isSelectionExpanded(editor);
  const selectionText = editor && getSelectionText(editor);

  const show = useCallback(() => {
    if (ref.current && hidden && selectionExpanded) {
      setHidden(false);
    }
  }, [hidden, ref, selectionExpanded]);

  const [, , reset] = useTimeoutFn(show, hiddenDelay);

  useEffect(() => {
    if (!hiddenDelay) {
      show();
    }
  }, [selectionText?.length, reset, hiddenDelay, show]);

  /**
   * Hide if not selecting.
   */
  useEffect(() => {
    if (!hidden && !selectionExpanded) {
      setHidden(true);
      if (ref.current) {
        ref.current.removeAttribute('style');
      }
    }
  }, [
    hidden,
    hiddenDelay,
    reset,
    selectionExpanded,
    show,
    selectionText?.length,
    ref,
  ]);

  /**
   * If hiddenDelay > 0:
   * Hide when the selection length changes.
   */
  useEffect(() => {
    if (!hiddenDelay) return;

    reset();
    setHidden(true);
  }, [hiddenDelay, selectionText?.length, reset]);

  return [hidden];
};

import { HistoryEditor } from 'slate-history/dist/history-editor';
import { ReactEditor } from 'slate-react';
import { SPEditor } from '../../../types/SPEditor';
import { usePlateStore } from '../plate.store';
import { getPlateState } from './getPlateState';

/**
 * Get editor ref which is never updated.
 */
export const useStoreEditorRef = <
  T extends SPEditor = SPEditor & ReactEditor & HistoryEditor
>(
  id?: string | null
) => usePlateStore((state) => getPlateState<T>(state as any, id)?.editor);

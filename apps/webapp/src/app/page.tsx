'use client';
import { EditStage } from '@our-tools/editor-stage';
// import { History } from '@our-tools/crdt-track';
// window.__history__ = new History()
// import styled from 'tailwind';

// const StyledPage = styled.div`
//   .page {
//   }
// `;

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <>
      <div className={'w-full h-full'}>
        <EditStage></EditStage>
      </div>
    </>
  );
}

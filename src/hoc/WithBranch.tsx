import { Store } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Branch, GetBranchesResponse } from '../interfaces/branch';
import network from '../services/network';
import { SystemConfigData } from '../types/app.types';
import API_PATHS from '../utilities/API-PATHS';
import cn from '../utilities/class-names';
import { getItem, setItem } from '../utilities/local-storage';

function SelectBranchComponent({
  branches,
  setBranchSelected,
}: {
  branches: Array<Branch>;
  setBranchSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const confirmSelection = () => {
    const branch = branches.find((b) => b.id === selectedBranch);
    setItem('BRANCH', branch);
    setBranchSelected(true);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-center text-2xl font-bold">Select a Branch</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {branches.map((branch) => (
          <button
            type="button"
            key={branch.id}
            className={cn(
              '`cursor-pointer rounded-md ring-2 ring-gray-400 transition-all hover:shadow-md',
              selectedBranch === branch.id &&
                'scale-105 shadow-lg ring-2 ring-primary hover:shadow-none'
            )}
            onClick={() => setSelectedBranch(branch.id)}
          >
            <div>
              <div className="p-6 text-center text-2xl font-semibold">
                {branch.name}
              </div>
            </div>
            <div className="flex justify-center p-6 pt-0">
              <Store className="h-16 w-16 text-primary" />
            </div>
            <div className="flex justify-center p-6 pt-0">
              {selectedBranch === branch.id && (
                <div className="text-sm font-semibold text-primary">
                  Selected
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="w-full max-w-xs cursor-pointer rounded-md bg-black px-4 py-2 text-white transition-all hover:bg-black/80"
          disabled={!selectedBranch}
          onClick={confirmSelection}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
}

function WithBranch({ children }: any) {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<GetBranchesResponse | null>(null);
  const [branchSelected, setBranchSelected] = useState(false);

  const getBranches = async () => {
    setIsPending(true);
    try {
      const systemConfig = getItem<SystemConfigData>('SYSTEM_CONFIG');
      if (!systemConfig) {
        throw new Error('no system config');
      }
      const result = await network.get<GetBranchesResponse>(
        API_PATHS.getBranches(systemConfig.tenant.id)
      );
      setIsPending(false);
      setData(result.data);
    } catch (error) {
      setIsPending(false);
      throw error;
    }
  };

  useEffect(() => {
    getBranches();
  }, []);

  if (isPending) return <div>Loading ...</div>;

  if (!data) return <div>Error ...</div>;

  if (!data.success) return <div>Error ...</div>;

  if (data.data.list.length === 1 && !branchSelected) {
    setItem('BRANCH', data.data.list[0]);
    setBranchSelected(true);
  }
  if (!branchSelected) {
    return (
      <SelectBranchComponent
        branches={data.data.list}
        setBranchSelected={setBranchSelected}
      />
    );
  }
  return children;
}

export default WithBranch;

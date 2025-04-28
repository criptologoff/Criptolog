import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Lock, 
  FileUp, 
  Hash, 
  Key, 
  Atom,
  Image,
  KeyRound,
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ToolsNavbarProps {
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
}

interface ToolGroup {
  id: string;
  label: string;
  tools: Tool[];
}

interface Tool {
  id: string;
  icon: React.ElementType;
  label: string;
  modes?: { id: string; label: string }[];
}

export const ToolsNavbar: React.FC<ToolsNavbarProps> = ({ activeTool, setActiveTool }) => {
  const { t } = useTranslation();

  const toolGroups: ToolGroup[] = [
    {
      id: 'encryption',
      label: t('tools.groups.encryption'),
      tools: [
        {
          id: 'text',
          icon: Lock,
          label: t('tools.textEncryption.title'),
          modes: [
            { id: 'text-encrypt', label: t('tools.textEncryption.encrypt') },
            { id: 'text-decrypt', label: t('tools.textEncryption.decrypt') }
          ]
        },
        {
          id: 'file',
          icon: FileUp,
          label: t('tools.fileEncryption.title'),
          modes: [
            { id: 'file-encrypt', label: t('tools.fileEncryption.encrypt') },
            { id: 'file-decrypt', label: t('tools.fileEncryption.decrypt') }
          ]
        },
        {
          id: 'chaos',
          icon: Image,
          label: t('tools.chaosEncryption.title'),
          modes: [
            { id: 'chaos-encrypt', label: t('tools.chaosEncryption.encrypt') },
            { id: 'chaos-decrypt', label: t('tools.chaosEncryption.decrypt') }
          ]
        }
      ]
    },
    {
      id: 'generators',
      label: t('tools.groups.generators'),
      tools: [
        {
          id: 'hash',
          icon: Hash,
          label: t('tools.generators.hash.title'),
          modes: [
            { id: 'hash-generate', label: t('tools.generators.hash.generate') },
            { id: 'hash-verify', label: t('tools.generators.hash.verify') }
          ]
        },
        {
          id: 'key',
          icon: Key,
          label: t('tools.generators.key.title'),
          modes: [
            { id: 'key-generate', label: t('tools.generators.key.generate') }
          ]
        },
        {
          id: 'password',
          icon: KeyRound,
          label: t('tools.generators.password.title'),
          modes: [
            { id: 'password-generate', label: t('tools.generators.password.generate') }
          ]
        }
      ]
    },
    {
      id: 'advanced',
      label: t('tools.groups.advanced'),
      tools: [
        {
          id: 'quantum',
          icon: Atom,
          label: t('tools.quantumSimulator.title'),
          modes: [
            { id: 'quantum-simulate', label: t('tools.quantumSimulator.simulate') }
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {toolGroups.map((group) => (
        <div key={group.id} className="space-y-3">
          <h3 className="text-lg font-semibold text-primary-400 text-center">
            {group.label}
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {group.tools.map((tool) => (
              <div key={tool.id} className="flex flex-col gap-2">
                {tool.modes?.map((mode) => {
                  const Icon = tool.icon;
                  return (
                    <Button
                      key={mode.id}
                      variant={activeTool === mode.id ? 'primary' : 'outline'}
                      onClick={() => setActiveTool(mode.id)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {mode.label}
                    </Button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}; 
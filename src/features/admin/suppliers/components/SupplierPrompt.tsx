import { useState } from 'react';

import { SupplierData } from '@/api';
import { apiGetGPTPrompt } from '@/api/adminNew';
import { Button, Input, Textarea } from '@/components/ui';
import { toast } from '@/hooks';
import { logger, parseErrorMessage } from '@/lib';

interface Props {
  onSubmit: (value: SupplierData) => void;
}

const SupplierPrompt = ({ onSubmit }: Props) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [json, setJson] = useState<SupplierData>();

  const onRenderPrompt = async () => {
    try {
      setLoading(true);
      const res = await apiGetGPTPrompt(url);
      setPrompt(res.prompt);
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full inline-flex items-center px-[40px] my-[40px] gap-x-4">
      <Input
        onChange={e => {
          setUrl(e.target.value);
          setPrompt('');
          setJson(undefined);
        }}
      />
      <Button
        label="Render prompt"
        className="px-8 py-8"
        disabled={!url}
        loading={loading}
        onClick={onRenderPrompt}
      />
      <Textarea value={prompt} />
      <Button
        label="Copy prompt"
        disabled={!prompt}
        className="px-8 py-8"
        onClick={() => {
          navigator.clipboard.writeText(prompt).catch(logger.log);
        }}
      />
      <Textarea
        value={json ? JSON.stringify(json) : ''}
        onChange={e => {
          setJson({
            ...JSON.parse(e.target.value),
            link: url
              ? [
                  {
                    link: url,
                    img: '',
                  },
                ]
              : [],
          } as SupplierData);
        }}
      />
      <Button
        label="Submit"
        className="px-8 py-8"
        disabled={!json}
        onClick={() => {
          if (json) {
            onSubmit(json);
          }
        }}
      />
    </div>
  );
};

export default SupplierPrompt;

import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Menu,
  Paper,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { PostView } from "lemmy-js-client";
import { useState } from "react";
import { AiFillGift } from "react-icons/ai";
import {
  BsFillEyeSlashFill,
  BsFlagFill,
  BsThreeDots,
  BsVolumeMuteFill,
} from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import { TbArrowBigDown, TbArrowBigUp, TbBadge } from "react-icons/tb";
import { getRelativeTime } from "../../utils/relativeTime";

interface PostCardProps {
  post: PostView;
}

const PostCard = ({ post }: PostCardProps) => {
  const [isImg, setIsImg] = useState(true);

  const [actionsGroupRef, rect] = useResizeObserver();

  const handleImageError = () => setIsImg(false);

  return (
    <Paper
      withBorder
      bg="gray.0"
      sx={(theme) => ({
        ":hover": { border: `solid 1px ${theme.colors.gray[5]}` },
        cursor: "pointer",
        overflow: "hidden",
      })}
    >
      <Flex>
        <Box bg="gray.1" p="sm">
          <Stack spacing="xs" align="center">
            <ActionIcon size="md">
              <TbArrowBigUp size="1.25rem" />
            </ActionIcon>
            <Text size="xs">{post.counts.score}</Text>
            <ActionIcon size="md">
              <TbArrowBigDown size="1.25rem" />
            </ActionIcon>
          </Stack>
        </Box>
        <Box>
          <Stack>
            <Stack p="md">
              <Group spacing="xs">
                <Avatar size="sm" src={post.community.icon} radius="xl" />
                <Text size="xs" weight="bold">
                  {post.community.name}
                </Text>
                <Box>·</Box>
                <Text size="xs" color="dimmed">
                  Posted by {post.creator.name}{" "}
                  {getRelativeTime(new Date(), new Date(post.post.published))}
                </Text>
              </Group>
              <Title order={4}>{post.post.name}</Title>
              {post.post.body ? (
                <Spoiler
                  maxHeight={120}
                  showLabel="Show more"
                  hideLabel="Show less"
                >
                  <Text>{post.post.body}</Text>
                </Spoiler>
              ) : isImg ? (
                <Image
                  src={post.post.url}
                  withPlaceholder
                  onError={handleImageError}
                />
              ) : (
                <Anchor href={post.post.url}>{post.post.url}</Anchor>
              )}
            </Stack>
            <Group spacing={0} ref={actionsGroupRef}>
              <Button
                p={6}
                variant="subtle"
                color="gray"
                leftIcon={<MdModeComment />}
                radius={0}
                sx={(theme) => ({
                  ":hover": { background: theme.colors.gray[1] },
                })}
              >
                {post.counts.comments} Comments
              </Button>
              {rect.width > 400 && (
                <Button
                  p={6}
                  variant="subtle"
                  color="gray"
                  leftIcon={<AiFillGift />}
                  radius={0}
                  sx={(theme) => ({
                    ":hover": { background: theme.colors.gray[1] },
                  })}
                >
                  Award
                </Button>
              )}
              {rect.width > 430 && (
                <Button
                  p={6}
                  variant="subtle"
                  color="gray"
                  leftIcon={<FaShare />}
                  radius={0}
                  sx={(theme) => ({
                    ":hover": { background: theme.colors.gray[1] },
                  })}
                >
                  Share
                </Button>
              )}
              {rect.width > 460 && (
                <Button
                  p={6}
                  variant="subtle"
                  color="gray"
                  leftIcon={<TbBadge />}
                  radius={0}
                  sx={(theme) => ({
                    ":hover": { background: theme.colors.gray[1] },
                  })}
                >
                  Save
                </Button>
              )}
              {rect.width > 500 && (
                <Button
                  p={6}
                  variant="subtle"
                  color="gray"
                  leftIcon={<BsVolumeMuteFill />}
                  radius={0}
                  sx={(theme) => ({
                    ":hover": { background: theme.colors.gray[1] },
                  })}
                >
                  Mute
                </Button>
              )}
              {rect.width > 530 && (
                <Button
                  p={6}
                  variant="subtle"
                  color="gray"
                  leftIcon={<BsFillEyeSlashFill />}
                  radius={0}
                  sx={(theme) => ({
                    ":hover": { background: theme.colors.gray[1] },
                  })}
                >
                  Hide
                </Button>
              )}
              {rect.width > 600 && (
                <Button
                  p={6}
                  variant="subtle"
                  color="gray"
                  leftIcon={<BsFlagFill />}
                  radius={0}
                  sx={(theme) => ({
                    ":hover": { background: theme.colors.gray[1] },
                  })}
                >
                  Report
                </Button>
              )}
              {rect.width < 600 && (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="subtle" radius="xl">
                      <BsThreeDots />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    {rect.width < 400 && (
                      <Menu.Item icon={<AiFillGift />}>Award</Menu.Item>
                    )}
                    {rect.width < 430 && (
                      <Menu.Item icon={<FaShare />}>Share</Menu.Item>
                    )}
                    {rect.width < 460 && (
                      <Menu.Item icon={<TbBadge />}>Save</Menu.Item>
                    )}
                    {rect.width < 500 && (
                      <Menu.Item icon={<BsVolumeMuteFill />}>Mute</Menu.Item>
                    )}
                    {rect.width < 530 && (
                      <Menu.Item icon={<BsFillEyeSlashFill />}>Hide</Menu.Item>
                    )}
                    <Menu.Item icon={<BsFlagFill />}>Report</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Stack>
        </Box>
      </Flex>
    </Paper>
  );
};

export default PostCard;

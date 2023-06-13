import {
  ActionIcon,
  Box,
  Button,
  Container,
  Divider,
  Group,
  Menu,
  Paper,
  Space,
  Stack,
} from "@mantine/core";
import { AiFillFire, AiFillRocket } from "react-icons/ai";
import {
  BsCaretDownFill,
  BsFillClockFill,
  BsMegaphoneFill,
  BsSunFill,
  BsThreeDots,
} from "react-icons/bs";
import { HiArrowTrendingUp, HiOutlineBarsArrowUp } from "react-icons/hi2";
import { MdOutlineViewHeadline, MdOutlineViewStream } from "react-icons/md";
import { useQuery } from "react-query";
import { useLemmy } from "../lemmy/hooks";
import PostCard from "../components/posts/card";

const Home = () => {
  const lemmyClient = useLemmy();
  const { data } = useQuery(["posts"], () => lemmyClient.getPosts({}));

  return (
    <Container p="md">
      <Paper p="sm" withBorder bg="gray.0">
        <Group spacing="sm">
          <Button
            variant="subtle"
            radius="xl"
            px="sm"
            leftIcon={<AiFillFire />}
          >
            Hot
          </Button>
          <Button
            variant="subtle"
            radius="xl"
            px="sm"
            leftIcon={<AiFillRocket />}
          >
            Active
          </Button>
          <Button variant="light" radius="xl" px="sm" leftIcon={<BsSunFill />}>
            New
          </Button>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="subtle" radius="xl" color="blue">
                <BsThreeDots />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<BsFillClockFill />}>Old</Menu.Item>
              <Menu.Item icon={<BsMegaphoneFill />}>Most Comments</Menu.Item>
              <Menu.Item icon={<HiArrowTrendingUp />}>New Comments</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Divider orientation="vertical" />
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                variant="subtle"
                radius="xl"
                px="sm"
                leftIcon={<HiOutlineBarsArrowUp />}
                rightIcon={<BsCaretDownFill />}
              >
                Top Past Day
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>Day</Menu.Item>
              <Menu.Item>Week</Menu.Item>
              <Menu.Item>Month</Menu.Item>
              <Menu.Item>Year</Menu.Item>
              <Menu.Item>All Time</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Box sx={{ flexGrow: 1 }} />

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                variant="subtle"
                radius="xl"
                px="sm"
                rightIcon={<BsCaretDownFill />}
              >
                <MdOutlineViewStream />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<MdOutlineViewStream />}>Card</Menu.Item>
              <Menu.Item icon={<MdOutlineViewHeadline />}>Compact</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Paper>

      <Space h="md" />

      <Stack>
        {data?.posts.map((p) => (
          <PostCard key={p.post.id} post={p} />
        ))}
      </Stack>
    </Container>
  );
};

export default Home;
